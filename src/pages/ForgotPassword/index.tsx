import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'


import { useToast } from '../../hooks/ToastContext'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo1.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background, AnimationContainer } from './styles'
import api from '../../services/api'

interface ForgotPasswordFormData {
  email: string
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoanding] = useState(false)
  const formRef = useRef<FormHandles>(null)
  
  const { addToast } = useToast()

  const handleSubmit = useCallback(async (data: ForgotPasswordFormData) => {
    try {
      setLoanding(true)
      formRef.current?.setErrors({})
      
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
      })

      await schema.validate(data, {
        abortEarly: false
      })
        
      await api.post('/password/forgot', {
        email: data.email
      })

      addToast({
        type: 'success',
        title: 'E-mail de recuperação enviado.',
        description: 'Cheque sua caixa de entrada'
      })

      // history.push('/dashboard')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Error ao recuperar senha',
        description: 'Ocorreu um erro ao recuperar senha, tente novamente.'
      })
    } finally {
      setLoanding(false)
    }

    
  }, [addToast])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} style={{ height: "35%" }} alt="Doctor Barber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar senha</h1>

            <Input icon={FiMail} name="email" placeholder="Email"/>

            <Button loading={loading} type="submit">Enviar</Button>

          </Form>
          
          <Link to="/">
            <FiLogIn />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ForgotPassword

