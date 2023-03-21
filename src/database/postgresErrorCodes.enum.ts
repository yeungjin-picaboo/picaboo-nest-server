enum PostgresErrorCode {
  UniqueViolation = '23505'
}
//email unique error code
//service에서 이메일을 가진 사용자가 이미 존재한다고 명시하지만
//공격자가 등록된 이메일 목록을 얻기 위해 API를 무차별 대입할 수 있기 때문에
//그것을 방지하는 메커니즘을 구현하는 것이 좋습니다.
