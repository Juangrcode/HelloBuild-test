type Props = {
  text: string;
  onClick: (event: React.SyntheticEvent) => void;
  type: 'submit' | 'button';
  disabled?: boolean;
};

const PrimaryButton: React.FC<Props> = ({ text, onClick, type, disabled }) => (
  <button className="bg-[#0066ff] " onClick={onClick} type={type} disabled={disabled}>
    {text}
  </button>
);

export default PrimaryButton;
