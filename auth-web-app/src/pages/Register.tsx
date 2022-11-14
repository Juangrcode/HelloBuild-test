import { useContext, useRef } from 'react';
import PrimaryButton from '../components/PrimaryButton';
import AppContext from '../context/AppContext';

type Props = {
  path: string;
};

const Register: React.FC<Props> = () => {
  const { signUp }: any = useContext(AppContext);
  const form: React.MutableRefObject<any> = useRef(null);

  const handleSubmit = async () => {
    const formData = new FormData(form.current);
    const buyer = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    console.log({ buyer });
    const res = await signUp(buyer);

    if (res) {
      // history.push('/login');
    }
  };

  return (
    <div className="Login">
      <div className="Login__container container flex justify-center items-center w-full h-full ">
        <div className="Card w-[500px] m-auto p-20 shadow-2xl text-center">
          <h2 className="text-2xl font-medium p-8">REGISTRARSE</h2>
          <form ref={form} className="flex justify-center items-center flex-col">
            <label htmlFor="username">
              <input type="text" name="username" placeholder="Nombre de usuario *" />
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
            <label htmlFor="password" className="py-4">
              <input type="password" name="password" placeholder="Contraseña *" />
            </label>
            <PrimaryButton text="Registrarse" onClick={handleSubmit} type="button" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
