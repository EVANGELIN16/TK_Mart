export default function Button({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: '10px 16px',
        background: '#333',
        color: '#fff',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  )
}
