import Button from './Button'

export default {
  title: 'Components/Button',
  component: Button
}

export const Default = () => <Button>Click Me</Button>
export const WithAction = () => <Button onClick={() => alert('Clicked!')}>Click</Button>
