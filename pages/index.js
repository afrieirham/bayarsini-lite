import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'

import { useAuth } from '@utils/auth'

export default function Home() {
  const { user, signInWithGoogle, signOut } = useAuth()
  return (
    <div>
      {user ? (
        <Button onClick={() => signOut()}>Logout</Button>
      ) : (
        <Button onClick={() => signInWithGoogle()}>Login</Button>
      )}
      <Text>Hello: {user?.name}</Text>
    </div>
  )
}
