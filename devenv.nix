{
  pkgs,
  ...
}:

{
  # The root .env holds the shared local infrastructure settings.
  # App-specific secrets stay in apps/*/.env.
  dotenv.enable = true;

  languages.javascript = {
    enable = true;
    package = pkgs.nodejs_22;
    corepack.enable = true;
  };

  packages = with pkgs; [
    git
    jq
    minio-client
    openssh
  ];

  enterShell = ''
    if [ -n "''${PGPORT:-}" ]; then
      export DATABASE_PORT="$PGPORT"
    fi
  '';

  services.postgres = {
    enable = true;
    package = pkgs.postgresql_15;
    listen_addresses = "127.0.0.1";
    port = 5432;
    initialDatabases = [{ name = "strapi"; }];
    initialScript = ''
      CREATE ROLE root LOGIN PASSWORD 'root' SUPERUSER;
      GRANT ALL PRIVILEGES ON DATABASE strapi TO root;
    '';
  };

  services.minio = {
    enable = true;
    accessKey = "root";
    secretKey = "rootroot";
    listenAddress = "127.0.0.1:9000";
    consoleAddress = "127.0.0.1:9001";
    buckets = ["strapi-media"];
    afterStart = ''
      mc anonymous set download local/strapi-media
    '';
  };

  services.mailpit.enable = true;

  processes.strapi = {
    # Use the port actually allocated by devenv (it may differ from 5432).
    exec = "DATABASE_PORT=$PGPORT pnpm --filter @studiomono.fr/strapi dev";
    after = [
      "devenv:processes:postgres"
      "devenv:processes:minio"
      "devenv:processes:mailpit"
    ];
  };

  processes.frontend = {
    exec = "pnpm --filter @studiomono.fr/frontend dev";
  };
}
