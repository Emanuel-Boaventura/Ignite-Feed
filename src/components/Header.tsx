import styele from './Header.module.css';
import igniteLogo from '../assets/ignite-logo.svg';

export default function Header() {
  return (
    <header className={styele.header}>
      <img src={igniteLogo} alt='Logo do Ignite' />
    </header>
  );
}
