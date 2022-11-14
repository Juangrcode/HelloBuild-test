import Header from './Header';
import Footer from './Footer';

import '../styles/components/Layout.css';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="Layout__container">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
