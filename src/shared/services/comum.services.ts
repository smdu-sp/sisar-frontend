function formatarSei(value: string): string {
    //1111.1111/1111111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 16);
    if (onlyNumbers.length <= 4)
        return onlyNumbers.replace(/(\d{0,4})/, '$1');
    if (onlyNumbers.length <= 8)
        return onlyNumbers.replace(/(\d{0,4})(\d{0,4})/, '$1.$2');
    if (onlyNumbers.length <= 15)
        return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})/, '$1.$2/$3');
    return onlyNumbers.replace(/(\d{0,4})(\d{0,4})(\d{0,7})(\d{0,1})/, '$1.$2/$3-$4');
}

function formatarSql(value: string): string {
    //111.111.1111-1
    if (!value) return value;
    const onlyNumbers = value && value.toString().replace(/\D/g, '').substring(0, 11);
    if (onlyNumbers.length <= 3)
        return onlyNumbers.replace(/(\d{0,3})/, '$1');
    if (onlyNumbers.length <= 6)
        return onlyNumbers.replace(/(\d{0,3})(\d{0,3})/, '$1.$2');
    if (onlyNumbers.length <= 10)
        return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})/, '$1.$2.$3');
    return onlyNumbers.replace(/(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,1})/, '$1.$2.$3-$4');
}

function formatarAprovaDigital(value: string): string {
    if (!value) return value;
    value = value.replaceAll('-', '').replaceAll('SP', '').substring(0, 13);
    let numeros = value.substring(0, 10).replace(/\D/g, '');
    let digitos = value.substring(10).replace(/(?![A-Z])./g, '');
    value = `${numeros}${digitos}`;
    if (value.length <= 8)
        return value.replace(/(\d{0,8})/, '$1');
    if (value.length <= 10)
        return value.replace(/(\d{0,8})(\d{0,2})/, '$1-$2');
    return value.replace(/(\d{0,8})(\d{0,2})(\d{0,3})/, '$1-$2-SP-$3');
}

function formatarFisico(value: string): string {
    // 1111-1-111-111-1
    if (!value) return value;
    const onlyNumbers = value.replace(/\D/g, '').substring(0, 12);
    if (onlyNumbers.length <= 4)
        return onlyNumbers.replace(/(\d{0,4})/, '$1');
    if (onlyNumbers.length <= 5)
        return onlyNumbers.replace(/(\d{0,4})(\d{0,1})/, '$1-$2');
    if (onlyNumbers.length <= 8)
        return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})/, '$1-$2.$3');
    if (onlyNumbers.length <= 11)
        return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})(\d{0,3})/, '$1-$2.$3.$4');
    return onlyNumbers.replace(/(\d{0,4})(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,1})/, '$1-$2.$3.$4-$5');
}


function validaDigitoSei(sei: string): boolean {
    var valido = false;
    console.log(sei);
    sei = sei && sei.toString().replace(/\D/g, '').substring(0, 16);
    if (sei.length > 16) sei = sei.slice(-16);
    if (sei.length === 16) {
        sei = sei.toString().trim();
        var soma = 0;
        const verificador = [2, 3, 4, 5, 6, 7, 8, 9];
        const digito = parseInt(sei[15]);
        let j = 0;
        for (let i = 14; i >= 0; i--) {
            if (j === 8) j = 0;
            soma += parseInt(sei[i]) * verificador[j];
            j++;
        }
        soma = soma % 11;
        soma = soma === 1 || soma === 0 ? 0 : 11 - soma;
        valido = soma === digito;
    } else return true;
    return valido;
}

function validaDigitoSql(sql: string): boolean {
    var valido = false;
    sql = sql.replace(/\D/g, '').substring(0, 11);
    if (sql.length > 11) sql = sql.slice(-11);
    if (sql.length === 11) {
        sql = sql.toString().trim();
        var soma = 0;
        const verificador = [1, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        const digito = parseInt(sql[10]);
        for (let i = 0; i < 10; i++)
            soma += parseInt(sql[i]) * verificador[i];
        soma = soma % 11;
        if (soma === 10) soma = 1;
        if (soma > 1 && soma < 10) soma = 11 - soma;
        valido = soma === digito;
    }
    return valido;
}

export {
    formatarAprovaDigital,
    formatarFisico,
    validaDigitoSei,
    validaDigitoSql,
    formatarSei,
    formatarSql
}