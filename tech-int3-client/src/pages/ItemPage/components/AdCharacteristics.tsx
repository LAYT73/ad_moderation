import { Table } from '@mantine/core';

interface Props {
  characteristics: Record<string, string>;
}

export function AdCharacteristics({ characteristics }: Props) {
  return (
    <Table striped highlightOnHover withTableBorder>
      <Table.Tbody>
        {Object.entries(characteristics).map(([key, value]) => (
          <Table.Tr key={key}>
            <Table.Td fw={600}>{key}</Table.Td>
            <Table.Td>{value}</Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
