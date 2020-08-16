import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import { Select, Form } from "semantic-ui-react";
import LoaderButton from "../components/LoaderButton";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import "./Signup.css";
import { Auth } from "aws-amplify";

const options = [
    { key: 'm', text: 'Masculino', value: "Masculino" },
    { key: 'f', text: 'Feminino', value: "Feminino" },
    { key: 'o', text: 'Outro', value: 'Outro' },
]

export default function Signup() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
        name: "",
        family_name: "",
        gender: "",
        birthdate: "",
        zoneinfo: "",
        locale: "",
        address: "",
        phone_number: "",

    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.name.length > 0 &&
            fields.family_name.length > 0 &&
            fields.gender.length > 0 &&
            fields.birthdate.length > 0 &&
            fields.zoneinfo.length > 0 &&
            fields.locale.length > 0 &&
            fields.address.length > 0 &&
            fields.phone_number.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            const newUser = await Auth.signUp({
                username: fields.email,
                password: fields.password,
                attributes: {
                    name: fields.name,
                    family_name: fields.family_name,
                    email: fields.email,
                    gender: fields.gender,
                    birthdate: fields.birthdate,
                    zoneinfo: fields.zoneinfo,
                    locale: fields.locale,
                    address: fields.address,
                    phone_number: fields.phone_number
                }           
            });

            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();

        setIsLoading(true);

        try {
            await Auth.confirmSignUp(fields.email, fields.confirmationCode);
            await Auth.signIn(fields.email, fields.password);

            userHasAuthenticated(true);
            history.push("/");
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Codigo de Confirmacao</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <HelpBlock>Por favor verifique o codigo no seu email.</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verificar
        </LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup  controlId="name" bsSize="large">
                    <ControlLabel>Nome</ControlLabel>
                    <FormControl
                        autoFocus
                        type="name"
                        onChange={handleFieldChange}
                        value={fields.name}
                    />
                </FormGroup>
                <FormGroup controlId="family_name" bsSize="large">
                    <ControlLabel>Sobrenome</ControlLabel>
                    <FormControl
                        type="family_name"
                        onChange={handleFieldChange}
                        value={fields.family_name}
                    />
                </FormGroup>
                <FormGroup controlId="gender" bsSize="large">
                    <ControlLabel>Genero</ControlLabel>
                    <FormControl
                        type="gender"
                        onChange={handleFieldChange}
                        value={fields.gender}
                    />
                </FormGroup>
                <FormGroup controlId="birthdate" bsSize="large">
                    <ControlLabel>Data de Nascimento (dd/mm/aa)</ControlLabel>
                    <FormControl                       
                        type="birthdate"
                        value={fields.birthdate}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="zoneinfo" bsSize="large">
                    <ControlLabel>CEP</ControlLabel>
                    <FormControl
                        type="zoneinfo"
                        onChange={handleFieldChange}
                        value={fields.zoneinfo}
                    />
                </FormGroup>
                <FormGroup controlId="locale" bsSize="large">
                    <ControlLabel>Cidade</ControlLabel>
                    <FormControl
                        type="locale"
                        onChange={handleFieldChange}
                        value={fields.locale}
                    />
                </FormGroup>
                <FormGroup controlId="address" bsSize="large">
                    <ControlLabel>Endereco</ControlLabel>
                    <FormControl
                        type="address"
                        onChange={handleFieldChange}
                        value={fields.address}
                />
                </FormGroup>
                <FormGroup controlId="phone_number" bsSize="large">
                    <ControlLabel>Celular</ControlLabel>
                    <FormControl
                        type="phone_number"
                        onChange={handleFieldChange}
                        value={fields.phone_number}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        onChange={handleFieldChange}
                        value={fields.email}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>          
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Signup
        </LoaderButton>
            </form>
        );
    }

    return (
        <div className="Signup">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}