import { useRouter } from 'next/router';
import appConfig from '../../config.json';

export const gitURL = 'https://github.com/';
export const apiGithub = 'https://api.github.com/users/';

// Armazena o user  no config.json usando o router do next
export function getUser() {
    const router = useRouter()
    appConfig.username = router.query.username || "Pedrohvfernandes"
}