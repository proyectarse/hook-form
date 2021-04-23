import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { validateRut, formatRut } from '../utils';
import errorMessage from '../common/errorMessages.json';
import { Controller } from 'react-hook-form';

const InputMaskText = (props) => {
	const {
		errors,
		req,
		disabled,
		defaultValue,
		labeltext,
		placeholder,
		name,
		options,
		type,
		control,
		minLength,
		maxLength,
		typeRut,
		...others
	} = props;

	const [stateMessage, setStateMessage] = useState('');
	const [stateError, setStateError] = useState(false);

	useEffect(() => {
		if (errors) {
			// console.log(errors, 'asi llega el error');
			switch (errors.type) {
				case 'required':
					setStateMessage(
						errorMessage.message[name].required
							? errorMessage.message[name].required
							: errorMessage.message[name]
					);
					break;
				case 'pattern':
					setStateMessage(errorMessage.message[name].pattern);
					break;
				case 'maxLength':
					setStateMessage(errorMessage.message[name].maxLength);
					break;
				case 'minLength':
					setStateMessage(errorMessage.message[name].minLength);
					break;
				case 'menorQue':
					setStateMessage(errorMessage.message[name].menorQue);
					break;
				case 'mayorQue':
					setStateMessage(errorMessage.message[name].mayorQue);
					break;
				case 'rutValido':
					setStateMessage(errorMessage.message[name].rutValido);
					break;
				case 'matchesPreviousPassword':
					setStateMessage(
						errorMessage.message[name].matchesPreviousPassword
					);
					break;
				case 'sizeFileValidate':
					setStateMessage('error en el doc, de peso');
					break;
				case 'typeFileValidate':
					setStateMessage('error en el doc, de tipo');
					break;
				default:
					break;
			}
			setStateError(true);
		} else {
			setStateMessage('');
			setStateError(false);
		}
	}, [errors]);

	//   validaciones
	let pattern = null;
	let validate = null;
	if (props.name === 'email') {
		pattern = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i;
	}

	if (name === 'rut' && req) {
		validate = {
			rutValido: (value) => validateRut(value),
		};
	}

	if (name === 'note') {
		pattern = /^(10|\d([.,]\d{1,2})?)$/;
	}

	return (
		<View style={styles.inputContainer}>
			<Controller
				control={control}
				render={({ field: { onChange, value } }) => (
					<TextInputMask
						type={type}
						style={styles.maskedInputStyle}
						options={options}
						disabled={disabled}
						{...others}
						placeholder={placeholder}
						value={value}
						onChangeText={onChange}
					/>
				)}
				name={name}
				defaultValue={defaultValue}
				rules={{
					required: req,
					maxLength: maxLength,
					minLength: minLength,
					pattern: pattern,
					validate: validate,
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {},
	errorStyle: {
		color: 'red',
	},
	errorContainerStyle: {
		borderBottomColor: 'red',
	},
});

export default InputMaskText;
