import esLocale from 'date-fns/locale/es';
import { format } from 'date-fns';

export const cleanRut = (rut) => {
	return typeof rut === 'string'
		? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase()
		: '';
};

export const validateRut = (rut) => {
	if (typeof rut !== 'string') {
		return false;
	}
	if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
		return false;
	}

	rut = cleanRut(rut);

	var t = parseInt(rut.slice(0, -1), 10);
	var m = 0;
	var s = 1;

	while (t > 0) {
		s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
		t = Math.floor(t / 10);
	}

	var v = s > 0 ? '' + (s - 1) : 'K';
	return v === rut.slice(-1);
};

export const formatRut = (rut) => {
	rut = cleanRut(rut);

	var result = rut.slice(-4, -1) + '-' + rut.substr(rut.length - 1);
	for (var i = 4; i < rut.length; i += 3) {
		result = rut.slice(-3 - i, -i) + '.' + result;
	}

	return result;
};

export const formatOnChangeRut = (e) => {
	console.log('pasa', e.name, e.text);
	return (e.target.value = formatRut(e.target.value));
};

export const dateConvert = (date) => {
	const converted = date.split('-');
	const newFormat = converted[2] + '-' + converted[1] + '-' + converted[0];
	let parts = newFormat.split('-');
	const toDateFormat1 = new Date(parts[0], parts[1] - 1, parts[2]);
	const toDateFormat2 = format(
		new Date(toDateFormat1),
		'yyyy-MM-dd',
		esLocale
	);
	const toDateFormat3 = new Date(
		new Date(toDateFormat2).getTime() +
			Math.abs(new Date(toDateFormat2).getTimezoneOffset() * 60000)
	);
	return toDateFormat3;
};

export const birthConvert = (date) => {
	const toDateFormat2 = format(new Date(date), 'dd-MM-yyyy', esLocale);

	return toDateFormat2;
};

export const dateFormatIso8601 = (date) => {
	const dateFormat = new Date(date).toISOString();
	const dateNewFormat = dateFormat.substring(0, 10);
	const [yy, mm, dd] = dateNewFormat.split(/-/g);
	return `${dd}/${mm}/${yy}`;
};

export const dateFormatIso = (date) => {
	const dateFormat = new Date(date).toISOString();
	const dateNewFormat = dateFormat.substring(0, 10);
	const [yy, mm, dd] = dateNewFormat.split(/-/g);
	return `${yy}-${mm}-${dd}`;
};
// const endFormat = dateFormatIso8601(end);

export const decimalAdjust = (type, value, exp) => {
	if (typeof exp === 'undefined' || +exp === 0) {
		return Math[type](value);
	}
	value = +value;
	exp = +exp;
	// Si el valor no es un número o el exp no es un entero...
	if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
		return NaN;
	}
	// Shift
	value = value.toString().split('e');
	value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
	// Shift back
	value = value.toString().split('e');
	return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
};
