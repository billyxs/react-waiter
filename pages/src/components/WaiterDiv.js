import styled from 'styled-components'

export function waiterColor({
  isPending,
  isResolved,
  isRejected,
  isCanceled
}) {
      if (isCanceled) {
        return '#666';
      }
      if (isPending) {
        return 'orange';
      }
      if (isResolved) {
        return 'green';
      }
      if (isRejected) {
        return 'red';
      }
      return 'black';
}

export const WaiterDiv = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  color: ${waiterColor};
  border: 1px solid #ccc;
  border-color: ${waiterColor};
  display: block;
`


