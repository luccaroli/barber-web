import styled from 'styled-components';
import { shade } from 'polished';


export const Container = styled.div`
  
`

export const Header = styled.header`
  padding: 32px 0;
  background: var(--black-medium);
`
export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: var(--text-secundary);
      width: 20px;
      height: 20px;
    }
  }
`
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      color: var(--text-primary);
    }

    strong {
      color: var(--primary);
    }
  }
`

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`
export const Schedule = styled.div`
  flex: 1;
  margin-left: 60px;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: var(--primary);
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: var(--primary);
      margin: 0 8px;
    }
  }


`
export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: var(--text-secundary);
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: var(--secundary);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      content: '';
      background: var(--primary);
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: var(--text-primary);
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: var(--text-secundary);
      
      svg {
        color: var(--primary);
        margin-right: 8px;
      }
    }
  }
`

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: var(--text-secundary);
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid var(--secundary);
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }

  > p {
    color: var(--text-secundary)
  }
`

export const Appointment = styled.div`
  display: flex;
  align-items: center;

  & + div {
    margin-top: 16px;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: var(--text-primary);
    
    svg {
      color: var(--primary);
      margin-right: 8px;
    }
  }

  div {
    flex: 1;
    background: var(--secundary);
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;

    img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: var(--text-primary);
      font-size: 18px;
    }

  }
`

export const Calendar = styled.aside`
  width: 380px;

  .DayPicker {
    background: var(--black-medium);
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: var(--secundary);
    border-radius: 10px;
    color: var(--text-primary);
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: var(--gray-hard) !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: var(--primary) !important;
    border-radius: 10px;
    color: var(--inputs) !important;
  }
`
