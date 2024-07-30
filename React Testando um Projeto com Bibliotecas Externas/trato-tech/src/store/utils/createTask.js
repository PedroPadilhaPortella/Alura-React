import { createStandaloneToast } from '@chakra-ui/toast';

const { toast } = createStandaloneToast();

export default async function createTask({ 
  fork,
  dispatch,
  action,
  serviceMethod,
  loadingMessage,
  successMessage,
  errorMessage,
}) {
  toast({
    title: 'Carregando',
    description: loadingMessage,
    status: 'loading',
    duration: 2000,
    isClosable: true
  });

  const tarefa = fork(async (api) => {
    return await serviceMethod();
  });

  const response = await tarefa.result;

  if (response.status === 'ok') {
    dispatch(action(response.value));

    toast({
      title: 'Sucesso!',
      description: successMessage,
      status: 'success',
      duration: 2000,
      isClosable: true
    });
  }

  if (response.status === 'rejected') {
    toast({
      title: 'Erro',
      description: errorMessage,
      status: 'error',
      duration: 2000,
      isClosable: true
    });
  }

  return response;
} 