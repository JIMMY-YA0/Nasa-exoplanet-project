import { useMemo } from 'react';
import { Appear, Table, Paragraph } from 'arwes';

const History = (props) => {
  const tableBody = useMemo(() => {
    return props.launches
      ?.filter((launch) => !launch.upcoming)
      .map((launch) => {
        return (
          <tr key={String(launch.flightNumber)}>
            <td>
              <span style={{ color: launch.success ? 'greenyellow' : 'red' }}>█</span>
            </td>
            <td>{launch.flightNumber}</td>
            <td>{new Date(launch.launchDate).toDateString()}</td>
            <td>{launch.mission}</td>
            <td>{launch.rocket}</td>
            <td>{launch.customers?.join(', ')}</td>
          </tr>
        );
      });
  }, [props.launches]);

  return (
    <article id="history">
      <Appear animate show={props.entered}>
        <Paragraph>
          History of mission launches including SpaceX launches starting from the year 2006.
        </Paragraph>
        <Table animate>
          <table style={{ tableLayout: 'fixed' }}>
            <thead>
              <tr>
                <th style={{ width: '1.5rem' }}></th>
                <th style={{ width: '2rem' }}>No.</th>
                <th style={{ width: '5rem' }}>Date</th>
                <th style={{ width: '5rem' }}>Mission</th>
                <th style={{ width: '4rem' }}>Rocket</th>
                <th style={{ width: '6rem' }}>Customers</th>
              </tr>
            </thead>
            <tbody>{tableBody}</tbody>
          </table>
        </Table>
      </Appear>
    </article>
  );
};

export default History;
