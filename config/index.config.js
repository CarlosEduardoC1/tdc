import { default as CadastroSchema } from "../pages/Cadastro/schema";

export const logo = '../../assets/img/logo_colorida.png';

export const validationNome = (text) => { return text === '' ? "O nome é obrigatório" : '' }

export const validationDate = (text) => {
    let dia = text.substring(2, 0);
    let mes = text.substring(4, 2);
    let ano = text.substring(8, 4);
    return dia + "/" + mes + "/" + ano
}

export const validationPhone = (text) => {
    if (text.length > 10) {
        return text.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3")
    } else {
        return text.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3")
    }
}

export const validationCPF = (text) => {
    var x = text.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})/);
    text = !x[2] ? x[1] : x[1] + '.' + x[2] + '.' + x[3] + '-' + x[4] + (x[5] ? '-' + x[5] : '');

    return text;
}

export const validationCEP = (text) => {
    if (!text) { return; }
    text = text.toString().replace(/\D/g, '');
    text = text.replace(/(\d{2})?(\d{3})?(\d{3})/, "$1.$2-$3");
    return text;
}