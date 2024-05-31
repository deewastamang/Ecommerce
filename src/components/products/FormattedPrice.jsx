

const FormattedPrice = ({amount}) => {
    const formattedAmount = new Number(amount).toLocaleString('en-US',{
            style : 'currency',
            currency : 'NRS',
            maximumFractionDigits: 2,
    })
  return (
    <span>{formattedAmount}</span>
  )
}

export default FormattedPrice