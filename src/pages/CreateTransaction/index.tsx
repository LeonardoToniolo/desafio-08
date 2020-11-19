/* eslint-disable no-unused-expressions */
import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiDollarSign } from 'react-icons/fi';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { Container, Title, AddFileContainer } from './styles';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import CreateSelect from '../../components/Select';

interface CreateTransactionFormData {
  title: string;
  value: string;
  type: string;
  category: string;
}

const CreateTransaction: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: CreateTransactionFormData) => {
      console.log(data);

      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required('Titulo obrigatorio'),
          value: Yup.string().required('Valor obrigatório'),
          category: Yup.string().required('Categoria obrigatória'),
          type: Yup.string().required('Categoria obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { type, title, category } = data;

        await api.post('/transactions', {
          title,
          value: parseFloat(data.value),
          type,
          category,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
      }
    },
    [history],
  );

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Adicionar uma transação</Title>
        <AddFileContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              type="text"
              placeholder="Titulo"
              name="title"
              icon={FiLogIn}
            />
            <Input
              type="text"
              placeholder="Valor"
              name="value"
              icon={FiDollarSign}
            />
            <CreateSelect
              name="type"
              placeholder="Tipo"
              options={[
                { value: 'income', label: 'Entrada' },
                { value: 'outcome', label: 'Saida' },
              ]}
            />
            <Input
              type="text"
              name="category"
              placeholder="Categoria"
              icon={FiLogIn}
            />
            <button type="submit">Enviar</button>
          </Form>
        </AddFileContainer>
      </Container>
    </>
  );
};

export default CreateTransaction;
