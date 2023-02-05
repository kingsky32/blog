import InternalForm from './Form';
import FormInput from './Input';
import FormButton from './Button';
import FormCheckBox from './CheckBox';

const Form = InternalForm as typeof InternalForm & {
  Input: typeof FormInput;
  Button: typeof FormButton;
  CheckBox: typeof FormCheckBox;
};

Form.Input = FormInput;
Form.Button = FormButton;
Form.CheckBox = FormCheckBox;

export default Form;
