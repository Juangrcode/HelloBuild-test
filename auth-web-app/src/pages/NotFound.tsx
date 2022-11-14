type Props = {
  default: boolean;
};

const NotFound: React.FC<Props> = () => {
  return (
    <div>
      <h2 className="text-2xl">Pagina no encontrada</h2>
    </div>
  );
};

export default NotFound;
