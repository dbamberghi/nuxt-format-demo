<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="6">
          <p class="form-label">
            <strong>{{capitalChosenLabel}}</strong>
            <br>
            {{capitalChosenData}}
          </p>
        </b-col>
        <b-col cols="6">
          <p class="form-label">
            <strong>{{capitalPartnersLabel}}</strong>
            <br>
            {{capitalPartnersData}}
          </p>
        </b-col>
        <b-col cols="6">
          <p class="form-label">
            <strong>{{mainShareholdersLabel}}</strong>
            <br>
            {{mainShareholdersData}}
          </p>
        </b-col>
        <b-col cols="6">
          <p class="form-label">
            <strong>{{capitalPartnersEffectiveLabel}}</strong>
            <br>
            {{capitalPartnersEffectiveData}}
          </p>
        </b-col>
        <b-col cols="6">
          <p class="form-label">
            <strong>{{percentLabel}}</strong>
            <br>
            {{percentData}}
          </p>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {formatCurrency, formatPercent} from "~/utils/formatterHelper";

export default {
  name: "FormattedExample",
  computed: {
    notAvailableMsg() {
      return 'N.D.';
    },
    capitalChosenLabel() {
      return 'Capitale Deliberato:';
    },
    capitalChosenData() {
      const value = 100000
      return formatCurrency(value, 'it', 'EUR') || this.notAvailableMsg;
    },
    capitalPartnersLabel() {
      return 'Sottoscritto:';
    },
    capitalPartnersData() {
      const value = 123456.44523
      return formatCurrency(value, 'it', 'EUR') || this.notAvailableMsg;

    },
    mainShareholdersLabel() {
      return 'Principali soci a capo del gruppo:';
    },
    mainShareholdersData() {
      // non so quale sia il dato --guy
      return this.notAvailableMsg;
    },
    capitalPartnersEffectiveLabel() {
      return 'Versato:';
    },
    capitalPartnersEffectiveData() {
      const shareCapital = 34564345.33
      const calledUpCapital = 1234.31132434;
      if (shareCapital && calledUpCapital) {
        return formatCurrency((shareCapital - calledUpCapital), 'it', 'EUR');
      }
      return formatCurrency(shareCapital, 'it', 'EUR') || this.notAvailableMsg;
    },
    percentLabel() {
      return 'Percent value:';
    },
    percentData() {
      return formatPercent(0.2342, 'it');
    },
  }
}
</script>

<style scoped>

</style>
