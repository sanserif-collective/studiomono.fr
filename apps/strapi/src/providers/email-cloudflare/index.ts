import { Buffer } from 'node:buffer';

type EmailAddress =
  | string
  | {
      address?: string;
      email?: string;
      name?: string;
    };

interface ProviderOptions {
  accountId?: string;
  apiToken?: string;
}

interface Settings {
  defaultFrom?: string;
  defaultReplyTo?: string;
}

interface Attachment {
  filename?: string;
  content?: string | Buffer | Uint8Array;
  contentType?: string;
  contentDisposition?: string;
  cid?: string;
  encoding?: BufferEncoding;
}

interface SendOptions {
  from?: EmailAddress;
  to?: EmailAddress | EmailAddress[];
  cc?: EmailAddress | EmailAddress[];
  bcc?: EmailAddress | EmailAddress[];
  replyTo?: EmailAddress;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
  headers?: Record<string, string>;
}

interface CloudflareAddress {
  address: string;
  name?: string;
}

interface CloudflareResponse {
  success?: boolean;
  errors?: { code: number; message: string }[];
  result?: unknown;
}

const API_URL = 'https://api.cloudflare.com/client/v4';

/**
 * Splits an address list on commas while ignoring commas inside display names
 * or quoted strings (e.g. `"Doe, John" <john@example.com>`).
 */
const splitAddressList = (value: string): string[] => {
  const parts: string[] = [];
  let current = '';
  let quoted = false;
  let angleBrackets = 0;

  for (const char of value) {
    if (char === '"') {
      quoted = !quoted;
    } else if (char === '<') {
      angleBrackets += 1;
    } else if (char === '>') {
      angleBrackets = Math.max(0, angleBrackets - 1);
    }

    if (char === ',' && !quoted && angleBrackets === 0) {
      parts.push(current);
      current = '';
      continue;
    }

    current += char;
  }

  parts.push(current);

  return parts.map((part) => part.trim()).filter(Boolean);
};

const parseAddress = (value: EmailAddress | undefined): CloudflareAddress | undefined => {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object') {
    const address = value.address ?? value.email;

    if (!address) {
      return undefined;
    }

    return value.name ? { address: address.trim(), name: value.name } : { address: address.trim() };
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  const match = /^(.*)<([^<>]+)>\s*$/.exec(trimmed);

  if (match) {
    const name = match[1]
      .trim()
      .replace(/^"(.*)"$/, '$1')
      .trim();
    const address = match[2].trim();

    return name ? { address, name } : { address };
  }

  return { address: trimmed };
};

const parseAddressList = (
  value: EmailAddress | EmailAddress[] | undefined,
): CloudflareAddress[] | undefined => {
  if (!value) {
    return undefined;
  }

  const values = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? splitAddressList(value)
      : [value];
  const addresses = values
    .map((address) => parseAddress(address))
    .filter((address): address is CloudflareAddress => Boolean(address));

  return addresses.length > 0 ? addresses : undefined;
};

const formatAddress = (address: CloudflareAddress): string =>
  address.name ? `"${address.name}" <${address.address}>` : address.address;

const encodeAttachment = (attachment: Attachment) => {
  if (!attachment.content) {
    throw new Error(
      'Cloudflare Email Service requires inline attachment content (Buffer or string)',
    );
  }

  if (typeof attachment.content === 'string') {
    return Buffer.from(attachment.content, attachment.encoding ?? 'utf8').toString('base64');
  }

  return Buffer.from(attachment.content).toString('base64');
};

const buildPayload = (options: SendOptions, settings: Settings) => {
  const from = parseAddress(options.from ?? settings.defaultFrom);

  if (!from) {
    throw new Error('Missing "from" address (set MAILER_EMAIL or pass options.from)');
  }

  const to = parseAddressList(options.to);

  if (!to) {
    throw new Error('Missing "to" recipient');
  }

  const replyTo = parseAddress(options.replyTo ?? settings.defaultReplyTo);
  const html = options.html;
  const text = options.text;

  if (!html && !text) {
    throw new Error('Missing email content (provide "html" or "text")');
  }

  const payload: Record<string, unknown> = {
    from,
    to,
    subject: options.subject ?? '',
  };

  if (html) {
    payload.html = html;
  }

  if (text) {
    payload.text = text;
  }

  const cc = parseAddressList(options.cc);
  if (cc) {
    payload.cc = cc;
  }

  const bcc = parseAddressList(options.bcc);
  if (bcc) {
    payload.bcc = bcc;
  }

  if (replyTo) {
    payload.reply_to = formatAddress(replyTo);
  }

  if (options.attachments?.length) {
    payload.attachments = options.attachments.map((attachment) => ({
      content: encodeAttachment(attachment),
      filename: attachment.filename,
      type: attachment.contentType,
      disposition: attachment.contentDisposition ?? 'attachment',
      ...(attachment.cid ? { content_id: attachment.cid } : {}),
    }));
  }

  if (options.headers && Object.keys(options.headers).length > 0) {
    payload.headers = options.headers;
  }

  return payload;
};

const cloudflareProvider = {
  provider: 'cloudflare',
  name: 'Cloudflare Email Service',

  init(providerOptions: ProviderOptions, settings: Settings) {
    const { accountId, apiToken } = providerOptions;

    if (!accountId) {
      throw new Error('Cloudflare Email Service: missing CLOUDFLARE_ACCOUNT_ID provider option');
    }

    if (!apiToken) {
      throw new Error(
        'Cloudflare Email Service: missing CLOUDFLARE_EMAIL_API_TOKEN provider option',
      );
    }

    const url = `${API_URL}/accounts/${accountId}/email/sending/send`;

    return {
      async send(options: SendOptions) {
        const payload = buildPayload(options, settings);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = (await response.json().catch(() => null)) as CloudflareResponse | null;

        if (!response.ok || data?.success === false) {
          const details = data?.errors
            ?.map((error) => `${error.code}: ${error.message}`)
            .join(', ');

          throw new Error(
            `Cloudflare Email Service request failed (${response.status})${details ? `: ${details}` : ''}`,
          );
        }

        return data?.result;
      },
    };
  },
};

// Strapi requires providers through CommonJS (`require(...)` then `.init`), so
// the provider must be the module export itself rather than a `default` key.
export = cloudflareProvider;
