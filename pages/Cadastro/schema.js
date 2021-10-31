import * as yup from 'yup';

let schema = yup.object().shape({
  mail: yup.string().email(),
  password: yup.string().min(8)
});

export default schema;