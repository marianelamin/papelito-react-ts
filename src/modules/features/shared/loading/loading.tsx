import React from 'react'
import { ProgressSpinner } from '../../../../ui/components/common'

export const Loading: React.FC = () => (
  <div className="flex justify-content-center">
    <ProgressSpinner />
  </div>
)

export default Loading
