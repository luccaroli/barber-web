import React from 'react';

import { 
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from './styles';
import logoImg from '../../assets/logo1.svg'
import { FiClock, FiPower } from 'react-icons/fi';
import { useAuth } from '../../hooks/AuthContext';

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth()

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="Doctor Barber Logo"/>

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

        <Content>
          <Schedule>
            <h1>Horários agendados</h1>
            <p>
              <span>Hoje</span>
              <span>Dia 08</span>
              <span>Quinta-feira</span>
            </p>

            <NextAppointment>
              <strong>Atendimento a seguir</strong>
              <div>
                <img src="https://avatars0.githubusercontent.com/u/61463908?s=460&u=6b0115a003370eaaf276cbc2ed2246aab43795a8&v=4" alt="Lucas Oliveira"/>

                <strong>Lucas Oliveira</strong>
                <span>
                  <FiClock />
                  20:00
                </span>
              </div>
            </NextAppointment>
          </Schedule>
          <Calendar />
        </Content>
    </Container>
  )
}

export default Dashboard;