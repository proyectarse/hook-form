import React, { useEffect } from 'react';
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
import { Button } from 'react-native-elements';
import { useForm } from 'react-hook-form';
import { InputText } from '../components';

const FormScreen = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm();
	const onSubmit = (data) => console.log(data);

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

	return (
		<View style={styles.screenContainerStyle}>
			<StatusBar style="auto" />
			<Text style={{ marginBottom: 20 }}>
				Hola Mundo Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Cumque, natus. Cupiditate molestiae ipsum quidem nostrum
				praesentium placeat temporatus. Cupiditate molestiae ipsum
				quidem nostrum praesentium placeat temporibus quis voluptates,
				sequi aliquam quas consequuntur, cumque corporis, vero aut
				facilis aliquid.
			</Text>
			<ScrollView
				style={{ paddingVertical: 20, backgroundColor: 'white' }}
			>
				<KeyboardAvoidingView
					behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
					style={styles.container}
					keyboardVerticalOffset={30}
				>
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<View style={styles.innerForm}>
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
								req={false}
								defaultValue=""
								labeltext="Rut"
								placeholder="Ingrese rut"
								name="rut"
								typeRut={true}
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

							<Button
								title="Enviar"
								type="outline"
								onPress={handleSubmit(onSubmit)}
							/>
						</View>
					</TouchableWithoutFeedback>
				</KeyboardAvoidingView>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 10,
	},
	screenContainerStyle: {
		paddingHorizontal: 10,
		paddingTop: 40,
		flex: 1,
		backgroundColor: 'whitesmoke',
	},
	innerForm: {
		flex: 1,
		paddingVertical: 10,
	},
});

export default FormScreen;
