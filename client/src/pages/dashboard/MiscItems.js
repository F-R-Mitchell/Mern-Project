import Calculator from '../../components/Calculator'
import CreateTodoList from '../../components/CreateTodoList'

const MiscItems = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Calculator />

      <CreateTodoList />
    </div>
  )
}
export default MiscItems
