import { useEffect, useRef, useState } from 'react';
import logo from '../sanserif.png';
import Field from './components/Field';

const logoUrl = new URL(logo, window.location.origin).toString();

export default function App() {
  const [firstname, setFirstname] = useState('Adonis');
  const [lastname, setLastname] = useState('Karpowicz');
  const [role, setRole] = useState('graphic designer & art director');
  const [phone, setPhone] = useState('+32 493 16 46 10');

  const signature = useRef<HTMLTableElement>(null);
  const [width, setWidth] = useState('');
  const [throttle, setThrottle] = useState<number>();

  useEffect(() => {
    if (signature.current) {
      setWidth(`${signature.current.offsetWidth}px`);
    }
  }, []);

  const handleChange = () => {
    window.clearTimeout(throttle);
    setWidth('auto');
    setThrottle(
      window.setTimeout(() => {
        if (signature.current) {
          setWidth(`${signature.current.offsetWidth}px`);
        }
      }, 1000),
    );
  };

  return (
    <>
      <form style={{ userSelect: 'none' }} onChange={handleChange}>
        <Field
          name="Prénom"
          value={firstname}
          onChange={({ target }) => setFirstname(target.value)}
        />
        <Field name="Nom" value={lastname} onChange={({ target }) => setLastname(target.value)} />
        <Field name="Rôle" value={role} onChange={({ target }) => setRole(target.value)} />
        <Field name="Téléphone" value={phone} onChange={({ target }) => setPhone(target.value)} />
      </form>
      <table
        ref={signature}
        style={{
          backgroundColor: '#EAEAEA',
          minWidth: width,
        }}
      >
        <tbody>
          <tr>
            <td style={{ padding: '16px' }}>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img
                        width="120"
                        src={logoUrl}
                        style={{ display: 'block' }}
                        alt="Sanserif Logo"
                      />
                    </td>
                    <td width="40"></td>
                    <td valign="top" style={{ textTransform: 'uppercase' }}>
                      <table>
                        <tbody>
                          <tr>
                            <td>Digital</td>
                            <td width="32"></td>
                            <td>Collective</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>{firstname}</td>
                            <td width="4"></td>
                            <td style={{ textTransform: 'uppercase' }}>{lastname}</td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}></td>
                    <td style={{ fontStyle: 'italic' }}>{role}</td>
                  </tr>
                  <tr style={{ height: 16 }}></tr>
                  <tr>
                    <td colSpan={2}>
                      <a href="https://sanserif.be" target="_blank" rel="noreferrer">
                        sanserif.be
                      </a>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td>©</td>
                            <td width="48"></td>
                            <td>
                              <a href={`tel:${phone}`}>{phone}</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
      <div style={{ marginTop: '40px', userSelect: 'none' }}>
        <p>Pour ajouter la signature&nbsp;:</p>
        <ol>
          <li>CTRL + A ou CMD + A (Tout sélectionner)</li>
          <li>CTRL + C ou CMD + C (Copier)</li>
          <li>CTRL + V ou CMD + V (Coller dans le client mail)</li>
        </ol>
      </div>
    </>
  );
}
