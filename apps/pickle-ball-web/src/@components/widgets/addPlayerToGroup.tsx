import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useEffect, useState } from 'react';

interface Player {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export function AddPlayerToGroup() {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const players : Player[] = [];

  const get_user_list = () => {
    fetch('https://acepicklapi.raganindustries.com/api_select_userlist.php', {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,        
      },
      
    }).then(res=>res.json())
    .then(
      (response) => {
        console.log(response);
      }
    ).catch((error) => {
      console.error('Error:', error);
    });
  }

  const panelFooterTemplate = () => {
    const length = selectedPlayers ? selectedPlayers.length : 0;

    return (
        <div className="py-2 px-3">
            <b>{length}</b> player{length > 1 ? 's' : ''} selected.
        </div>
    );
};
const playerViewTemplate = (option:any) => {
  return (
    <div className="flex align-items-center">
        <h6 className='mb-0'>{option.name}</h6>
        <small className='text-secondary'>{option.email} | {option.phone}</small>
    </div>
);
}
useEffect(() => {
  get_user_list();
}, []);
  return (
    <div
      className="modal fade"
      id="addPlayerModal"
      tabIndex={-1}
      aria-labelledby="addPlayerLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addPlayerLabel">
              Add player to group
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form action="">
              <div className="mb-3">
                <label htmlFor="playerName" className="form-label">
                  Player Name
                </label>
                <MultiSelect
                  value={selectedPlayers}
                  onChange={(e: MultiSelectChangeEvent) => setSelectedPlayers(e.value)}
                  options={players}
                  optionLabel="name"
                  display="chip"
                  placeholder="Select players"
                  maxSelectedLabels={4}
                  className="w-100"
                  filter
                  filterBy='name,email,phone'                  
                  itemTemplate={playerViewTemplate}
                  panelFooterTemplate={panelFooterTemplate}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
