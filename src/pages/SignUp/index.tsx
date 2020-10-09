import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'
import { useToast } from '../../hooks/ToastContext'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo1.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, AnimationContainer, Background } from './styles'

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)    
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({})
      
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'No minímo 6 dígitos')
      })

      await schema.validate(data, {
        abortEarly: false
      })

      await api.post("/users", data)

      history.push('/')

      addToast({
        type: 'success',
        title: 'Cadastro realizado',
        description: 'Você já pode fazer seu logon no Doctor Barber'
      })
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Error no cadastro',
        description: 'Ocorreu um erro ao cadastro, tente novamente.'
      })
    }

  }, [addToast, history])

  return (
    <Container>
      <Background />

      <Content>
        <AnimationContainer>
          <img src={logoImg} style={{ height: "35%" }} alt="Doctor Barber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu cadastro</h1>

            <Input icon={FiUser} name="name" placeholder="Nome"/>
            <Input icon={FiMail} name="email" placeholder="Email"/>

            <Input icon={FiLock} name="password" type="password" placeholder="Senha"/>

            <Button type="submit">Cadastrar</Button>
          </Form>
          
          <Link to="/">
            <FiArrowLeft />
            Voltar para o logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  )
}

export default SignUp

