<template>
  <div class="about">
    <h1>This is an Internet page</h1>
    <form
      method="get"
      action="http://thisnode.info/cgi-bin/pirania/handle_voucher"
    >
      <label class="int-selectVoucher"></label>
      <div class="hidden" id="station-list"></div>
      <input type="text" id="voucher" name="voucher" />
      <input type="hidden" id="nojs" name="nojs" value="true" />
      <br /><input type="submit" id="voucherInput-submit" value="Submit" />
    </form>
  </div>
</template>
