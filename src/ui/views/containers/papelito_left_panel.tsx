import { useCallback, useState } from 'react';
import { Steps } from 'primereact/steps';

import { useSelector } from 'react-redux';

import { PapelitosComponent, Instructions, RoomDetails, Game } from 'ui/components';

import { RootState } from '+redux/store';
import { GameState } from '+redux/feature/game/game_slice';

import { PapButton } from '../../components/common';
import { CreateTeams } from 'ui/components/create_teams';
import { StartGame } from 'ui/components/start_game';

const viewStyle = {
  minHeight: '350px',
  paddingTop: '1rem',
  alignItems: 'baseline',
  display: 'flex',
  flexWwrap: 'nowrap',
};

const StepSections = [
  {
    label: 'Instructions',
    component: Instructions,
  },
  {
    label: 'Review room settings',
    component: RoomDetails,
  },
  {
    label: 'Submit papelitos',
    component: PapelitosComponent,
  },
  {
    label: 'Set Teams',
    component: CreateTeams,
  },
  {
    label: 'Start Game',
    component: StartGame,
  },
];

export const PapelitoLeftPanel = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const goToNext = useCallback(() => setActiveIndex((prev) => prev + 1), []);
  const goToBack = useCallback(() => setActiveIndex((prev) => prev - 1), []);

  const game = useSelector<RootState, GameState>((state) => state.game);

  return !game.isGameStarted ? (
    <div style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
      <Steps
        model={StepSections.map((e) => ({ label: e.label }))}
        activeIndex={activeIndex}
        onSelect={(e) => setActiveIndex(e.index)}
        readOnly={false}
      />

      {StepSections.map((e, index) => {
        return (
          activeIndex === index && (
            <>
              <div style={viewStyle}>
                <e.component />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <PapButton
                  disabled={index === 0}
                  link
                  label={'Prev'}
                  onClick={goToBack}
                ></PapButton>
                <PapButton
                  link
                  disabled={index === StepSections.length - 1}
                  label={'Next'}
                  onClick={goToNext}
                ></PapButton>
              </div>
            </>
          )
        );
      })}
    </div>
  ) : (
    <Game />
  );
};
