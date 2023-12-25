/**
 * components/Problems.tsx
 *
 * show all Problems
 */
import { ProblemType } from "@/types/Problem";
import { truncate } from "@/app/util/utils";

const table_row = `
    border text-center`;

const hover_row = `
    hover:bg-sky-800`;

type Props = {
  handleClick: (problemId: number) => void;
  problems: ProblemType[];
};

export function Problems(props: Props) {
  return (
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className={`${table_row} w-16`}>id</th>
          <th className={`${table_row}`}>Front</th>
          <th className={`${table_row}`}>Back</th>
        </tr>
      </thead>

      <tbody>
        {props.problems.map((prob) => (
          <tr
            key={prob.id}
            className={hover_row}
            onClick={() => props.handleClick(prob.id)}
          >
            <td className={`${table_row}`}>{prob.id}</td>
            <td className={`${table_row}`}>{truncate(prob.front)}</td>
            <td className={`${table_row}`}>{truncate(prob.back)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
