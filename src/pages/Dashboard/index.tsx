import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FiClock, FiPower } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import logoImg from '../../assets/logo1.svg'
import { useAuth } from '../../hooks/AuthContext';

import { 
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Section,
  Appointment,
  Calendar,
} from './styles';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

const Dashboard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [monthAvalability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([])

  const { signOut, user } = useAuth()

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available) {
      setSelectedDate(day)
    }

  }, [])

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month)
  }, [])

  useEffect(() => {
    api.get(`/providers/${user.id}/month-availability`, {
      params: {
        year: currentMonth.getFullYear(),
        month: currentMonth.getMonth() + 1,
      }
    }).then(response => {
      setMonthAvailability(response.data)
    })
  }, [currentMonth, user.id])

  const disableDays = useMemo(() => {
    const dates = monthAvalability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth()

        return new Date(year, month, monthDay.day)
      })

      return dates
  }, [currentMonth, monthAvalability])

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

            <Section>
              <strong>Manhã</strong>

              <Appointment>
                <span>
                  <FiClock />
                  20:00
                </span>

                <div>
                  <img 
                    src="https://avatars0.githubusercontent.com/u/61463908?s=460&u=6b0115a003370eaaf276cbc2ed2246aab43795a8&v=4" 
                    alt="Lucas Oliveira"/>
                  <strong>Lucas Oliveira</strong>
                </div>
              </Appointment>

              <Appointment>
                <span>
                  <FiClock />
                  20:00
                </span>

                <div>
                  <img 
                    src="https://avatars0.githubusercontent.com/u/61463908?s=460&u=6b0115a003370eaaf276cbc2ed2246aab43795a8&v=4" 
                    alt="Lucas Oliveira"
                  />
                  <strong>Lucas Oliveira</strong>
                </div>
              </Appointment>
            </Section>

            <Section>
              <strong>Tarde</strong>

              <Appointment>
                <span>
                  <FiClock />
                  20:00
                </span>

                <div>
                  <img src="https://avatars0.githubusercontent.com/u/61463908?s=460&u=6b0115a003370eaaf276cbc2ed2246aab43795a8&v=4" alt="Lucas Oliveira"/>

                  <strong>Lucas Oliveira</strong>
                </div>
              </Appointment>
            </Section>
          </Schedule>

          <Calendar>
            <DayPicker 
              weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
              fromMonth={new Date()} 
              disabledDays={[{ daysOfWeek: [0, 6]}, ...disableDays]}
              modifiers={{ available: { daysOfWeek: [1, 2, 3, 4, 5]} }}
              onDayClick={handleDateChange}
              onMonthChange={handleMonthChange}
              selectedDays={selectedDate}
              months={[
                'Janeiro',
                'Fevereiro',
                'Março',
                'Abril',
                'Maio',
                'Junho',
                'Julho',
                'Agosto',
                'Setembro',
                'Outubro',
                'Novembro',
                'Dezembro',
              ]}
            />
          </Calendar>
        </Content>
    </Container>
  )
}

export default Dashboard;