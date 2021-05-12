/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch, useSelector} from "react-redux";
import { useLocation, useHistory } from 'react-router';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { getQueryParams } from '../../common/queryparams';
import { loadState } from '../../reducers/localStorage';
import { setMapping } from "../../reducers/action";
import './mappingmodal.scss';

const MappingModal = (props: MappingModalProps) => {
    const { className, center, wrapClassName, modalClassName, openOnLoad, toggle, onClosed, unmountOnClose } = props;
    const history = useHistory();
    const location = useLocation();
    const { t } = useTranslation();
    const mapping = useSelector(state => state.mappingReducer.mapping);
    const dispatch = useDispatch();
    const queryParams: { [key: string]: string } = getQueryParams(location.search);

    const removeMapping = (mid:string) => {
        const localmapping = loadState()!==undefined ? loadState().mappingReducer.mapping : [];
        const newMapping = localmapping.filter((m:string) => m!==mid);
        dispatch(setMapping(newMapping));
        onClosed();
    };
    const gotoMyMap = () => {
        toggle();
        if (location.pathname!=='/map' || queryParams.rvKey) {
            history.push({
                pathname: '/map',
                search: '',
            });
        }
    };
    return (
        <Modal
            isOpen={openOnLoad}
            toggle={toggle}
            className={className}
            wrapClassName={wrapClassName}
            modalClassName={modalClassName}
            centered={center}
            unmountOnClose={unmountOnClose}
            onClosed={onClosed}
            aria-labelledby="modal-heading"
            aria-describedby="modal-description"
        >
            <ModalHeader id="modal-heading" tag="h2" toggle={toggle}>
                {t('modal.mapping.title')}
            </ModalHeader>
            <ModalBody id="modal-description" tag="div">
            {loadState()!==undefined && loadState().mappingReducer.mapping.length>0 ?
                loadState().mappingReducer.mapping.map((mid: string, mindex: number) => (
                    <button
                        key={`ml-${mindex}`}
                        type="button"
                        className="btn btn btn-filter"
                        onClick={() => removeMapping(mid)}
                    >
                        {mid} <i className="fas fa-times" />
                    </button> 
                ) ) : t('modal.mapping.noadded')}
            </ModalBody>
            <ModalFooter>
                {loadState()!==undefined && loadState().mappingReducer.mapping.length>0 && 
                <Button color="secondary" onClick={gotoMyMap}>
                    {t('modal.mapping.gotomymap')}
                </Button> }
                <Button color="secondary" onClick={toggle}>
                    {t('modal.mapping.cancel')}
                </Button>
            </ModalFooter>
        </Modal>
    );
};

interface MappingModalProps {
    className: string;
    center: boolean;
    wrapClassName: string;
    modalClassName: string;
    openOnLoad: boolean;
    toggle: any;
    onClosed: any;
    unmountOnClose: boolean;
}


export default MappingModal;
