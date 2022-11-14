import '../styles/components/Footer.css';

const Footer: React.FC = () => {
  return (
    <div className="Footer">
      <div className="container flex items-center justify-around">
        <p className="Footer-title">HelloBuild Test</p>
        <p className="Footer-created">Desarrollado por @juangrcode</p>
      </div>
    </div>
  );
};

export default Footer;
