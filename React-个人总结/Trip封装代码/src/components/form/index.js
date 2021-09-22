import './index.scss'
import Form from './form'
import FormItem, { FormItemShell } from './formItem'
// 提交按钮
import FormSubmitButton from './formSubmitButton'

// 字段特例
import TextArea from './formItemTextArea'
import Email from './formItemEmail'
import Switch from './formItemSwitch'
import RadioGroup from './formItemRadioGroup'
import Select from './formItemSelect'
import DatePicker from './formItemDatePicker'
import DateRange from './formItemDateRange'
import Upload from './formItemUpload'
import Url from './formItemUrl'

// 特例
import SelectCustomer from './formItemSelectCustomer' // 商户
import SelectVccCustomer from './formItemSelectVccCustomer'
import { 
    FormItemSelectVccCustomerCardCurrency, 
    FormItemSelectVccCustomerSettleCurrency 
} from './formItemSelectVccCustomerCurrency'
import SelectRole from './formItemSelectRole' // 用户角色
import SelectCountryArea from './formItemSelectCountryArea' // 国家地区
import SelectBizType from './formItemSelectBizType'
import SelectBizOwnership from './formItemSelectBizOwnership'
import SelectBizStaffSize from './formItemSelectBizStaffSize'
import SelectPaymentPurpose from './formItemSelectPaymentPurpose'
import SelectMonthlyPaymentCount from './formItemSelectMonthlyPaymentCount'
import SelectMonthlyPaymentAmount from './formItemSelectMonthlyPaymentAmount'
import SelectSinglePaymentAverAmount from './formItemSelectSinglePaymentAverAmount'
import SelectSinglePaymentMaxAmount from './formItemSelectSinglePaymentMaxAmount'
import SelectCurrency from './formItemSelectCurrency'
import SelectCurrencyCustomerDic from './formItemSelectCurrencyCustomerDic'
import SelectCurrencyQueryPayoutSupport from './formItemSelectCurrencyQueryPayoutSupport' 
import SelectSubjectId from './formItemSelectSubjectId'
import SelectProduct from './formItemSelectProduct'
import SelectProvisionBank from './formItemSelectProvisionBank'
import SelectProvisionBankCurrency from './formItemSelectProvisionBankCurrency'
import SelectProcessBizType from './formItemSelectProcessBizTye'
import SelectRiskLevel from './formItemSelectRiskLevel'
import SelectKycStatus from './formItemSelectKycStatus'
import CheckboxRiskTrade from './formItemCheckboxRiskTrade'
import CheckboxBlackList from './formItemCheckboxBlackList'

Form.SubmitButton = FormSubmitButton;
Form.ItemShell = FormItemShell;
Form.Item = FormItem

Object.assign(FormItem, {   
    TextArea, 
    Email,
    Switch,
    RadioGroup,
    DatePicker,
    DateRange,
    Upload,
    Url,
    Select,
    SelectCustomer,
    SelectVccCustomer,
    SelectVccCustomerCardCurrency: FormItemSelectVccCustomerCardCurrency,
    SelectVccCustomerSettleCurrency: FormItemSelectVccCustomerSettleCurrency,
    SelectRole,
    SelectCurrency,
    SelectCurrencyCustomerDic,
    SelectCurrencyQueryPayoutSupport,
    SelectSubjectId,
    SelectCountryArea,
    SelectBizType,
    SelectBizOwnership,
    SelectBizStaffSize,
    SelectPaymentPurpose,
    SelectMonthlyPaymentCount,
    SelectMonthlyPaymentAmount,
    SelectSinglePaymentAverAmount,
    SelectSinglePaymentMaxAmount,
    SelectProcessBizType,
    SelectRiskLevel,
    SelectProduct,
    SelectProvisionBank,
    SelectProvisionBankCurrency,
    SelectKycStatus,
    CheckboxRiskTrade,
    CheckboxBlackList
});

export default Form;