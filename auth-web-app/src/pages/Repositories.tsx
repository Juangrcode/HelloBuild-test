import { useContext, useRef } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import AppContext from '../context/AppContext';

import { Link } from 'react-router-dom';

type Props = {
  path: string;
};

const Repositories: React.FC<Props> = () => {
  const {
    state: { user },
    setCreateRepository,
  }: any = useContext(AppContext);
  const form: React.MutableRefObject<any> = useRef(null);

  const handleSubmit = async () => {
    const formData = new FormData(form.current);
    const buyer = {
      name: formData.get('name'),
      isFavorite: Boolean(formData.get('isFavorite')),
      user: user && user.user?.id,
    };
    console.log({ buyer });
    // const res = await signUp(buyer);
    if (user) {
      const res = setCreateRepository(buyer, user.token);
      if (res) {
        // history.push('/profile');
      }
    }
  };

  return (
    <div className="w-[500px] m-auto p-20 shadow-2xl text-center">
      <h2 className="text-2xl font-medium p-8">CREAR REPOSITORIO</h2>
      <form ref={form} className="flex justify-center items-center flex-col">
        <label htmlFor="name">
          <input type="text" name="name" placeholder="Nombre del repositorio *" />
          {/* {errorMsg && <p className="col-12 no-gutter text-start text-error letter_uppercase">{errorMsg}</p>}
              {((!errorMsg && props.withText(props.name)) || props.withText(props.name) === 0) && !withoutText && (
                <p className="col-12 no-gutter text-start">{`${props.name} ${required ? '*' : ''}`}</p>
              )}
              <Input
                {...props}
                placeholder={
                  props.placeholder
                    ? `${props.placeholder} ${required ? '*' : ''}`
                    : `${props.name} ${required ? '*' : ''}`
                }
                error={errorMsg}
              /> */}
        </label>
        <label htmlFor="isFavorite" className="py-4 flex items-center">
          <input className="w-4 h-4 min-w-[20px] mr-2" type="checkbox" name="isFavorite" />
          Favorito
        </label>
        <PrimaryButton text="Crear" onClick={handleSubmit} type="button" />
      </form>
    </div>
  );
};

export default Repositories;
