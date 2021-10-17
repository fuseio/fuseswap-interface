import React, { useEffect, useMemo, useState } from 'react'
import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge-icon2.svg'
import { getMessageFromTxHash, getStatusFromTxHash } from '../../graphql/queries'
import { getForeignAmbSubgraph, getHomeAmbSubgraph } from '../../graphql/utils'
import { useActiveWeb3React } from '../../hooks'
import { BridgeTransaction } from '../../state/bridge/actions'
import { TYPE } from '../../theme'
import { getChainIds, getForeignAmbAddress, getForeignAmbContract, packSignatures } from '../../utils'
import { AutoColumn } from '../Column'
import { NETWORK_LABELS } from '../Header'
import Modal from '../Modal'
import { RowCenter } from '../Row'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'

interface ClaimTransferModalProps {
  isOpen: boolean
  onDismiss: () => void
  bridgeTransaction: BridgeTransaction
}

export default function ClaimTransferModal({
  isOpen,
  onDismiss,
  bridgeTransaction: { txHash, bridgeDirection }
}: ClaimTransferModalProps) {
  const { chainId, account, library } = useActiveWeb3React()
  const [message, setMessage] = useState<any>(null)
  const [executionStatus, setExecutionStatus] = useState<any>(false)

  const chains = useMemo(() => getChainIds(bridgeDirection), [bridgeDirection])
  const foreignAmbAddress = useMemo(() => getForeignAmbAddress(bridgeDirection), [bridgeDirection])

  const addTransaction = useTransactionAdder()

  useEffect(() => {
    async function getMessage() {
      const msg = await getMessageFromTxHash(txHash, getHomeAmbSubgraph(bridgeDirection))
      if (msg && msg.signatures) {
        setMessage(msg)
      }
    }

    let intervalId: any

    if (txHash && !message) {
      intervalId = setInterval(getMessage, 5000)
    }

    return () => clearInterval(intervalId)
  }, [bridgeDirection, message, txHash])

  useEffect(() => {
    async function getStatus() {
      if (message && message.msgId) {
        const status = await getStatusFromTxHash(message.msgId, getForeignAmbSubgraph(bridgeDirection))
        if (status) {
          setExecutionStatus(status)
        }
      }
    }

    getStatus()
  }, [bridgeDirection, message])

  async function onClaim() {
    if (!library || !account || !message || !foreignAmbAddress || executionStatus) return

    try {
      const foreignAmb = getForeignAmbContract(foreignAmbAddress, library, account)
      const response = await foreignAmb.executeSignatures(message.msgData, packSignatures(message.signatures))

      addTransaction(response, {
        summary: 'Claimed bridge tokens'
      })

      onDismiss()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    <Modal isOpen={isOpen} onDismiss={() => {}}>
      <AutoColumn gap="md" style={{ padding: '20px', width: '100%' }}>
        <TYPE.mediumHeader fontWeight={500} textAlign="center" paddingBottom="1rem">
          Claim your tokens
        </TYPE.mediumHeader>
        <RowCenter>
          <BridgeIcon width="120px" />
        </RowCenter>
        <RowCenter>
          {chains ? (
            chainId === chains.foreignChain ? (
              <>
                {message ? (
                  !executionStatus ? (
                    <ButtonPrimary onClick={() => onClaim()}>Claim</ButtonPrimary>
                  ) : (
                    <TYPE.body fontSize={18} fontWeight={500}>
                      Already executed
                    </TYPE.body>
                  )
                ) : (
                  <TYPE.body fontSize={18} fontWeight={500}>
                    Waiting for signatures
                  </TYPE.body>
                )}
              </>
            ) : (
              <TYPE.body fontSize={18} fontWeight={500}>
                Switch to {NETWORK_LABELS[chains.foreignChain]}
              </TYPE.body>
            )
          ) : (
            <TYPE.body fontSize={18} fontWeight={500}></TYPE.body>
          )}
        </RowCenter>
      </AutoColumn>
    </Modal>
  )
}
