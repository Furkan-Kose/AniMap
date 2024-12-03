import { Link } from 'react-router'

const Header = () => {
  return (
    <div className='flex items-center justify-center gap-8 h-20'>
        <Link to='/' className='text-2xl font-bold text-gray-800 hover:underline'>Ana Sayfa</Link>
        <Link to='/add' className='text-2xl font-bold text-gray-800 hover:underline'>Hayvam Ekle</Link>
    </div>
  )
}

export default Header