<template>
  <div class="content-inner">
    <div class="content-inner-header">
      <h3>Libraries</h3>
    </div>

    <table>
      <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Version</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="library in website.libraries">
        <td>
        </td>

        <td>
          {{ library.name }}
        </td>

        <td>
          {{ library.version || library.error }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'project-details-libraries',
    props: ['website'],
  };
</script>

<style lang="scss" scoped>
  .content-inner {
    padding: 0;

    box-shadow: 2px 4px 15px rgba(232, 237, 250, 0.5);
    background-color: #ffffff;
  }

  .content-inner-header {
    padding: 39px 23px 0 40px;
  }

  h3 {
    display: inline-block;
    margin-bottom: 19px;

    line-height: 32px;
    letter-spacing: 0.75px;
  }

  table {
    width: 100%;
    max-width: 903px;

    background-color: #fafbff;
    border-collapse: collapse;
    box-shadow: 3px 3px 15px rgba(232, 237, 250, 0.5);
  }

  thead tr {
    height: 56px;
  }

  th {
    opacity: 0.87;
    color: #505464;
    font-size: 14px;
    font-weight: 700;
    line-height: 30px;
    letter-spacing: 0.42px;
    text-align: left;
  }

  th:first-child {
    width: 40px;
    text-align: center;
  }

  tbody tr {
    height: 48px;

    &:hover {
      background-image: linear-gradient(to top, rgba(249, 253, 255, 0) 0%, rgba(245, 249, 254, 0.57) 57%, #eef5ff 100%);
    }
  }

  td {
    border-top: 1px solid #e3e9fa;
    padding-left: 5px;
    padding-right: 5px;

    &:nth-child(4) {
      white-space: nowrap;
    }

    &, a {
      color: #505464;
      font-size: 16px;
      font-weight: 300;
      letter-spacing: 0.48px;
    }
  }

  td:first-child {
    width: 40px;
    text-align: center;
  }
</style>
