import React, { useCallback, useRef } from 'react'
import { FiLock } from 'react-icons/fi'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import { useHistory, useLocation } from 'react-router-dom'


import { useToast } from '../../hooks/ToastContext'
import api from '../../services/api'

import getValidationErrors from '../../utils/getValidationErrors'

import logoImg from '../../assets/logo1.svg'

import Input from '../../components/Input'
import Button from '../../components/Button'

import { Container, Content, Background, AnimationContainer } from './styles'

interface ResetPasswordFormData {
  password: string
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  
  const { addToast } = useToast()

  const history = useHistory()
  const location = useLocation()
  

  const handleSubmit = useCallback(async (data: ResetPasswordFormData) => {
    try {
      formRef.current?.setErrors({})
      
      const schema = Yup.object().shape({
        password: Yup.string().required('Nova senha'),
        password_confirmation: Yup.string().oneOf(
          [Yup.ref('password'), undefined], 'as senhas não correspondem'
        )
      })

      await schema.validate(data, {
        abortEarly: false
      })

      const { password, password_confirmation } = data
      const token = location.search.replace('?token=', '')

      if (!token) {
        throw new Error()
      }

      api.post('password/reset', {
        password,
        password_confirmation,
        token,
      })


      history.push('/')
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Error na alteração de senha',
        description: 'tente novamente.'
      })
    }

    
  }, [addToast, history, location.search])

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} style={{ height: "35%" }} alt="Doctor Barber"/>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Alterar senha</h1>


            <Input 
              icon={FiLock} 
              name="password" 
              type="password" 
              placeholder="Nova senha"
            />
            <Input 
              icon={FiLock} 
              name="password_confirmation" 
              type="password" 
              placeholder="Confirme a nova senha"
            />

            <Button type="submit">Enviar</Button>

          </Form>
          
        </AnimationContainer>
      </Content>

      <Background />
    </Container>
  )
}

export default ResetPassword

