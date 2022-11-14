import PrimaryButton from '../components/PrimaryButton';

import { useNavigate } from 'react-router-dom';

type Props = {};

const NotFound: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleClickReturnHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h2 className="text-2xl my-8">Página no encontrada</h2>
      <PrimaryButton onClick={handleClickReturnHome} text="Volver al inicio" type="button" />
    </div>
  );
};

export default NotFound;
