import { PapButton } from './common';

export const CreateTeams = () => {
  return (
    <div className={'grid p-3 gap-3'}>
      <div>
        <h4>Equipos</h4>
        <div className="grid gap-3">
          <div className="col">
            <p>Team A</p>
            <p>Player 1</p>
            <p>Player 2</p>
          </div>
          <div className="col">
            <p>Team B</p>
            <p>Player 1</p>
            <p>Player 2</p>
          </div>
          <div className="col">
            <p>Team C</p>
            <p>Player 1</p>
            <p>Player 2</p>
          </div>
          <div className="col">
            <p>Team D</p>
            <p>Player 1</p>
            <p>Player 2</p>
          </div>
        </div>
      </div>
      <PapButton icon={<i className="pi pi-replay" />} label="Shuffle Players" link />
    </div>
  );
};
