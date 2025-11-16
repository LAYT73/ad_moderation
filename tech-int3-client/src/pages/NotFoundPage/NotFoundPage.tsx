import { Button, Stack, Title } from '@mantine/core';

const NotFoundPage = () => {
  return (
    <Stack justify="center" style={{ height: '100vh' }} align="center">
      <Title order={1} className="text-center">
        404: Страница не найдена
      </Title>
      <Button variant="outline" mt="md" onClick={() => window.history.back()}>
        Назад
      </Button>
    </Stack>
  );
};

export default NotFoundPage;
