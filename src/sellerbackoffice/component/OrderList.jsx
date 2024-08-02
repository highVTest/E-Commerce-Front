import { useState } from 'react';
import { Table, Checkbox } from '@mantine/core';

const elements = [
  { orderId: 1, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 2, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 3, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 4, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 5, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 6, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 7, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 8, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 9, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
  { orderId: 10, buyerEmail: 12.011, totalPrice: '198,000', status: '주문완료', updatedDate:'2024/08/01 23:50:00'},
];

const OrderList = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  const rows = elements.map((element) => (
    <Table.Tr
      key={element.name}
      bg={selectedRows.includes(element.position) ? 'var(--mantine-color-blue-light)' : undefined}
    >
      <Table.Td>
        <Checkbox
          aria-label="Select row"
          checked={selectedRows.includes(element.orderId)}
          onChange={(event) =>
            setSelectedRows(
              event.currentTarget.checked
                ? [...selectedRows, element.orderId]
                : selectedRows.filter((orderId) => orderId !== element.orderId)
            )
          }
        />
      </Table.Td>
      <Table.Td>{element.orderId}</Table.Td>
      <Table.Td>{element.buyerEmail}</Table.Td>
      <Table.Td>{element.totalPrice}</Table.Td>
      <Table.Td>{element.status}</Table.Td>
      <Table.Td>{element.updatedDate}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th />
          <Table.Th>OrderId</Table.Th>
          <Table.Th>BuyerEmail</Table.Th>
          <Table.Th>TotalPrice</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>UpdatedDate</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default OrderList;