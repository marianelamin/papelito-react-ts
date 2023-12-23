import React, { type RefObject, useRef } from 'react'
import { Toast } from 'primereact/toast'

export const PapToast = (props: { toast: RefObject<Toast> }) => {
  // constructor(props:any) {
  //     super(props);
  //     this.showSuccess = this.showSuccess.bind(this);
  //     this.showInfo = this.showInfo.bind(this);
  //     this.showWarn = this.showWarn.bind(this);
  //     this.showError = this.showError.bind(this);
  //     this.showTopLeft = this.showTopLeft.bind(this);
  //     this.showBottomLeft = this.showBottomLeft.bind(this);
  //     this.showBottomRight = this.showBottomRight.bind(this);
  //     this.showMultiple = this.showMultiple.bind(this);
  //     this.showSticky = this.showSticky.bind(this);
  //     this.showConfirm = this.showConfirm.bind(this);
  //     this.clear = this.clear.bind(this);
  // }

  // showInfo() {
  //     toast.show({severity:'info', summary: 'Info Message', detail:'Message Content', life: 3000});
  // }

  // showWarn() {
  //     toast.show({severity:'warn', summary: 'Warn Message', detail:'Message Content', life: 3000});
  // }

  // showError() {
  //     toast.show({severity:'error', summary: 'Error Message', detail:'Message Content', life: 3000});
  // }

  // showTopLeft() {
  //     toast.show({severity: 'info', summary: 'Info Message', detail: 'Message Content', life: 3000});
  // }

  // showBottomLeft() {
  //     toast.show({severity:'warn', summary: 'Warn Message', detail:'Message Content', life: 3000});
  // }

  // showBottomRight() {
  //     toast.show({severity:'success', summary: 'Success Message', detail:'Message Content', life: 3000});
  // }

  // showSticky() {
  //     toast.show({severity: 'info', summary: 'Sticky Message', detail: 'Message Content', sticky: true});
  // }

  // showConfirm() {
  //     toast.show({ severity: 'warn', sticky: true, content: (
  //         <div className="flex flex-column" style={{flex: '1'}}>
  //             <div className="text-center">
  //                 <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
  //                 <h4>Are you sure?</h4>
  //                 <p>Confirm to proceed</p>
  //             </div>
  //             <div className="grid p-fluid">
  //                 <div className="col-6">
  //                     <Button type="button" label="Yes" className="p-button-success" />
  //                 </div>
  //                 <div className="col-6">
  //                     <Button type="button" label="No" className="p-button-secondary" />
  //                 </div>
  //             </div>
  //         </div>
  //     ) });
  // }

  // showMultiple() {
  //     toast.show([
  //         {severity:'info', summary:'Message 1', detail:'Message 1 Content', life: 3000},
  //         {severity:'info', summary:'Message 2', detail:'Message 2 Content', life: 3000},
  //         {severity:'info', summary:'Message 3', detail:'Message 3 Content', life: 3000}
  //     ]);
  // }

  // clear() {
  //     toast.clear();
  // }

  return (
    <div>
      <Toast ref={props.toast} />
      {/* <Toast ref={(el) => toast = el} position="top-left" />
                <Toast ref={(el) => toast = el} position="bottom-left" />
                <Toast ref={(el) => toast = el} position="bottom-right" />
                <Toast ref={(el) => toast = el} position="bottom-center" /> */}

      {/* <div className="card toast-demo">
                    <h5>Severities</h5>
                    <Button label="Success" className="p-button-success" onClick={this.showSuccess} />
                    <Button label="Info" className="p-button-info" onClick={this.showInfo} />
                    <Button label="Warn" className="p-button-warning" onClick={this.showWarn} />
                    <Button label="Error" className="p-button-danger" onClick={this.showError} />

                    <h5>Positions</h5>
                    <Button label="Top Left" className="mr-2" onClick={this.showTopLeft} />
                    <Button label="Bottom Left" className="p-button-warning" onClick={this.showBottomLeft} />
                    <Button label="Bottom Right" className="p-button-success" onClick={this.showBottomRight} />

                    <h5>Options</h5>
                    <Button onClick={this.showMultiple} label="Multiple" className="p-button-warning" />
                    <Button onClick={this.showSticky} label="Sticky" />

                    <h5>Clear</h5>
                    <Button onClick={this.clear} label="Clear" />

                    <h5>Custom</h5>
                    <Button type="button" onClick={this.showConfirm} label="Confirm" className="ui-button-warning" />
                </div> */}
    </div>
  )
}
