import styled, { css } from 'styled-components'

export const ItemProcessContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-inline: auto;
  margin-top: 0.75rem;
  width: 48rem;
  gap: 0.5rem;
  background: #262626;
  padding: 1rem;
  border-radius: 8px;
  justify-content: space-between;

  h2 {
    color: #8284fa;
    font-size: 0.875rem;
    font-weight: bold;
  }

  p {
    color: #f2f2f2;
    font-size: 0.875rem;
  }
`

interface ProcessStatusProps {
  variant: 'verde' | 'vermelho'
}

export const ProcessStatus = styled.div<ProcessStatusProps>`
  span {
    color: #ab222e;
    font-weight: bold;
    font-size: 0.875rem;

    ${(props) =>
      props.variant === 'verde' &&
      css`
        color: #00875f;
      `}
  }
`
