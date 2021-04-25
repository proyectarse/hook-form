import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	KeyboardAvoidingView,
	Text,
	StyleSheet,
	Platform,
	View,
	TouchableWithoutFeedback,
	ScrollView,
	Keyboard,
	TextInput,
} from 'react-native';
import { Button, Switch } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useForm, Controller } from 'react-hook-form';
import { InputText, InputMaskText } from '../components';
import { birthConvert } from '../utils';

const FormScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
	} = useForm();
	const onSubmit = (data) => console.log(data);

	const [date, setDate] = useState(new Date(Date.now()));
	const [show, setShow] = useState(false);
	const [birthState, setBirthState] = useState();

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		try {
			const res = await fetch(
				`http://jsonplaceholder.typicode.com/users/1`
			);
			const { name, email } = await res.json();
			setValue('name', name);
		} catch (error) {}
	};

	const watchSwitch = watch('switchBot');
	// const watchDate = watch('date');

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(Platform.OS === 'ios');
		setDate(selectedDate ? currentDate : new Date(Date.now()));
		setValue('date', selectedDate ? birthConvert(currentDate) : '');
	};

	// console.log(watchDate, '<---');

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.container}
			keyboardVerticalOffset={0}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView
					style={{
						backgroundColor: 'white',
						flex: 1,
						paddingVertical: 20,
					}}
				>
					<StatusBar style="auto" />
					<Text style={{ marginBottom: 20 }}>
						Hola Mundo Lorem ipsum dolor sit amet consectetur
						adipisicing elit. Cumque, natus. Cupiditate molestiae
						ipsum quidem nostrum praesentium placeat temporatus.
						Cupiditate molestiae ipsum quidem nostrum praesentium
						placeat temporibus quis voluptates, sequi aliquam quas
						consequuntur, cumque corporis, vero aut facilis aliquid.
					</Text>
					<View style={styles.innerForm}>
						<>
							<InputText
								errors={errors.name}
								req={true}
								defaultValue=""
								labeltext="Nombre Completo"
								placeholder="Ingrese nombre"
								name="name"
								control={control}
							/>

							<InputText
								errors={errors.address}
								req={false}
								defaultValue=""
								labeltext="Dirección"
								placeholder="Ingrese Dirección"
								name="address"
								control={control}
							/>

							<InputText
								errors={errors.rut}
								req={true}
								defaultValue=""
								labeltext="Rut"
								placeholder="Ingrese rut"
								name="rut"
								typeRut={true}
								control={control}
							/>

							<InputText
								errors={errors.date}
								req={true}
								defaultValue=""
								labeltext="Día"
								placeholder="Ingrese día"
								name="date"
								editable={false}
								control={control}
							/>

							<InputText
								errors={errors.component}
								req={true}
								defaultValue=""
								labeltext="Componente"
								placeholder="Ingrese Componente"
								name="component"
								control={control}
							/>

							<InputText
								errors={errors.component2}
								req={true}
								defaultValue=""
								labeltext="Componente2"
								placeholder="Ingrese Componente2"
								name="component2"
								control={control}
							/>

							<InputMaskText
								errors={errors.birth}
								req={true}
								defaultValue=""
								labeltext="Nacimiento"
								placeholder="tu fecha de nacimiento"
								name="birth"
								type={'datetime'}
								options={{ format: 'DD/MM/YYYY' }}
								control={control}
							/>

							<Controller
								control={control}
								defaultValue={false}
								name="switchBot"
								render={({ field: { onChange, value } }) => (
									<Switch
										color="orange"
										value={value}
										onValueChange={onChange}
									/>
								)}
							/>

							<Button
								title="Ingresar fecha"
								onPress={() => setShow(true)}
							/>

							{show && (
								<DateTimePicker
									testID="dateTimePicker"
									value={date}
									mode="date"
									is24Hour={true}
									display="default"
									onChange={onChange}
								/>
							)}

							{watchSwitch && (
								<Text
									style={{
										textAlign: 'center',
										marginBottom: 20,
									}}
								>
									El switch esta activo.
								</Text>
							)}

							<Button
								title="Enviar"
								type="outline"
								onPress={handleSubmit(onSubmit)}
							/>
						</>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screenContainerStyle: {
		paddingHorizontal: 10,
		paddingTop: 40,
		flex: 1,
		backgroundColor: 'whitesmoke',
	},
	innerForm: {
		flex: 1,
		paddingHorizontal: 10,
		marginBottom: 30,
	},
	maskedInputStyle: {
		fontSize: 15,
		paddingHorizontal: 10,
	},
});

export default FormScreen;
